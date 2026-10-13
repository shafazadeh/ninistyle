import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_N8N_WEBHOOK_URL = 'https://gedase6607.app.n8n.cloud/webhook/sendphotos';

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  // Allow larger payload for high quality images (base64)
  app.use(express.json({ limit: '40mb' }));
  app.use(express.urlencoded({ extended: true, limit: '40mb' }));

  // Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Diagnostic Test Route
  app.post('/api/test-n8n', async (req: Request, res: Response) => {
    const targetUrl = req.body.webhookUrl || DEFAULT_N8N_WEBHOOK_URL;
    const format = req.body.format || 'multipart'; // Default to multipart FormData which n8n expects

    try {
      console.log(`[Diagnostic] Testing n8n webhook: ${targetUrl} in format: ${format}`);
      const startTime = Date.now();

      let fetchOptions: RequestInit;

      // Small sample JPEG base64 strings
      const sampleBase64 = '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=';
      const sampleDataUrl = `data:image/jpeg;base64,${sampleBase64}`;

      if (format === 'multipart') {
        const formData = new FormData();
        const dummyBuffer = Buffer.from(sampleBase64, 'base64');
        const dummyBlob = new Blob([dummyBuffer], { type: 'image/jpeg' });
        
        // Primary requested keys: Character_Image and Product_Image
        formData.append('Character_Image', dummyBlob, 'character.jpg');
        formData.append('Product_Image', dummyBlob, 'product.jpg');
        formData.append('child_image', dummyBlob, 'child.jpg');
        formData.append('cloth_image', dummyBlob, 'clothing.jpg');
        formData.append('character_image', dummyBlob, 'character.jpg');
        formData.append('product_image', dummyBlob, 'product.jpg');
        formData.append('data0', dummyBlob, 'child.jpg');
        formData.append('data2', dummyBlob, 'cloth.jpg');
        formData.append('test', 'true');

        fetchOptions = {
          method: 'POST',
          body: formData,
        };
      } else {
        fetchOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            Character_Image: sampleDataUrl,
            Product_Image: sampleDataUrl,
            character_image: sampleDataUrl,
            product_image: sampleDataUrl,
            child_image: sampleDataUrl,
            cloth_image: sampleDataUrl,
            child_base64: sampleBase64,
            cloth_base64: sampleBase64,
            clothing_image: sampleDataUrl,
            test: true,
            timestamp: new Date().toISOString()
          }),
        };
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);
      fetchOptions.signal = controller.signal;

      const n8nRes = await fetch(targetUrl, fetchOptions);
      clearTimeout(timeoutId);
      const elapsedMs = Date.now() - startTime;
      const status = n8nRes.status;
      const contentType = n8nRes.headers.get('content-type') || '';
      const text = await n8nRes.text();

      return res.json({
        ok: n8nRes.ok,
        status,
        elapsedMs,
        contentType,
        targetUrl,
        responseSnippet: text,
      });
    } catch (err: any) {
      return res.status(500).json({
        ok: false,
        error: err.message || 'خطا در ارتباط با وب‌هوک',
      });
    }
  });

  // Proxy endpoint to n8n webhook
  app.post('/api/try-on', async (req: Request, res: Response) => {
    try {
      const {
        childImage,
        clothingImage,
        clothingTitle,
        clothingId,
        childAge,
        childGender,
        webhookUrl,
        sendMode = 'multipart', // Default to FormData (multipart) as n8n expects
        childFieldName = 'Character_Image',
        clothingFieldName = 'Product_Image',
        includeAlternativeKeys = true,
      } = req.body;

      if (!childImage || !clothingImage) {
        return res.status(400).json({
          error: 'هر دو تصویر کودک و لباس الزامی هستند',
        });
      }

      const targetUrl = webhookUrl || DEFAULT_N8N_WEBHOOK_URL;
      console.log(`[Try-On] Forwarding request to n8n: ${targetUrl} (mode: ${sendMode})`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 85000); // Allow up to 85s for AI try-on generation

      let n8nResponse: globalThis.Response;

      if (sendMode === 'multipart') {
        const formData = new FormData();
        
        const childBase64Data = childImage.includes(',') ? childImage.split(',')[1] : childImage;
        const clothBase64Data = clothingImage.includes(',') ? clothingImage.split(',')[1] : clothingImage;

        const childBuffer = Buffer.from(childBase64Data, 'base64');
        const clothBuffer = Buffer.from(clothBase64Data, 'base64');

        const childBlob = new Blob([childBuffer], { type: 'image/jpeg' });
        const clothBlob = new Blob([clothBuffer], { type: 'image/jpeg' });

        const childKey = childFieldName || 'Character_Image';
        const clothingKey = clothingFieldName || 'Product_Image';

        // Primary files sent to n8n in FormData
        formData.append(childKey, childBlob, 'character.jpg');
        formData.append(clothingKey, clothBlob, 'product.jpg');

        if (childKey !== 'Character_Image') formData.append('Character_Image', childBlob, 'character.jpg');
        if (clothingKey !== 'Product_Image') formData.append('Product_Image', clothBlob, 'product.jpg');

        if (includeAlternativeKeys) {
          formData.append('child_image', childBlob, 'child.jpg');
          formData.append('cloth_image', clothBlob, 'clothing.jpg');
          formData.append('character_image', childBlob, 'character.jpg');
          formData.append('product_image', clothBlob, 'product.jpg');
          formData.append('data0', childBlob, 'child.jpg');
          formData.append('data2', clothBlob, 'clothing.jpg');
        }

        formData.append('clothing_title', clothingTitle || '');
        formData.append('clothing_id', clothingId || '');
        formData.append('child_age', childAge || '');
        formData.append('child_gender', childGender || '');

        console.log(`[Try-On] FormData built with primary keys: [${childKey}, ${clothingKey}]`);

        n8nResponse = await fetch(targetUrl, {
          method: 'POST',
          body: formData,
          signal: controller.signal,
        });
      } else {
        // JSON Base64 mode
        const childRaw = childImage.includes(',') ? childImage.split(',')[1] : childImage;
        const clothRaw = clothingImage.includes(',') ? clothingImage.split(',')[1] : clothingImage;

        const payload: Record<string, any> = {
          Character_Image: childImage,
          Product_Image: clothingImage,
          character_image: childImage,
          product_image: clothingImage,
          child_image: childImage,
          cloth_image: clothingImage,
          clothing_image: clothingImage,
          Character_Base64: childRaw,
          Product_Base64: clothRaw,
          child_base64: childRaw,
          cloth_base64: clothRaw,
          data0: childImage,
          data2: clothingImage,
          clothing_title: clothingTitle || '',
          clothing_id: clothingId || '',
          child_age: childAge || '',
          child_gender: childGender || '',
          requested_at: new Date().toISOString(),
        };

        if (childFieldName && !payload[childFieldName]) {
          payload[childFieldName] = childImage;
        }
        if (clothingFieldName && !payload[clothingFieldName]) {
          payload[clothingFieldName] = clothingImage;
        }

        console.log(`[Try-On] Sending JSON Base64 payload with keys [Character_Image, Product_Image] to: ${targetUrl}`);

        n8nResponse = await fetch(targetUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, image/*, */*',
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });
      }

      clearTimeout(timeoutId);

      const contentType = n8nResponse.headers.get('content-type') || '';
      console.log(`[Try-On] n8n responded with status ${n8nResponse.status}, content-type: ${contentType}`);

      // If binary image was returned
      if (contentType.includes('image/')) {
        const buffer = await n8nResponse.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        const dataUrl = `data:${contentType};base64,${base64}`;
        return res.json({
          success: true,
          resultImage: dataUrl,
          source: 'n8n_binary',
          status: n8nResponse.status,
        });
      }

      // If JSON response was returned
      if (contentType.includes('application/json')) {
        const data = await n8nResponse.json();

        // Check if n8n returned error (e.g., Error in workflow)
        if (!n8nResponse.ok) {
          return res.status(n8nResponse.status).json({
            success: false,
            error: data.message || data.error || `خطای اتومیشن n8n (کد ${n8nResponse.status})`,
            n8nDetails: data,
            status: n8nResponse.status,
          });
        }

        // Search for image in common response formats
        let resultImage = '';
        if (Array.isArray(data) && data.length > 0) {
          const item = data[0];
          resultImage = item.imageUrl || item.result_image || item.image || item.output || item.url || item.image_url || '';
        } else if (typeof data === 'object' && data !== null) {
          resultImage = data.imageUrl || data.result_image || data.image || data.output || data.url || data.image_url || data.resultImage || '';
        }

        return res.json({
          success: true,
          resultImage: resultImage || null,
          data,
          source: 'n8n_json',
          status: n8nResponse.status,
        });
      }

      // Fallback for text/plain or other
      const textData = await n8nResponse.text();
      if (!n8nResponse.ok) {
        return res.status(n8nResponse.status).json({
          success: false,
          error: textData || `خطای ارتباط با n8n (کد ${n8nResponse.status})`,
          status: n8nResponse.status,
        });
      }

      // Check if text is URL or base64
      if (textData.startsWith('http') || textData.startsWith('data:image/')) {
        return res.json({
          success: true,
          resultImage: textData.trim(),
          source: 'n8n_text',
          status: n8nResponse.status,
        });
      }

      return res.json({
        success: true,
        resultImage: null,
        message: textData,
        source: 'n8n_text_message',
        status: n8nResponse.status,
      });
    } catch (err: any) {
      console.error('[Try-On Error]', err);
      const isTimeout = err.name === 'AbortError';
      return res.status(isTimeout ? 504 : 500).json({
        success: false,
        error: isTimeout
          ? 'زمان پاسخ‌دهی اتومیشن n8n طولانی شد (تایم‌اوت ۶۰ ثانیه). لطفا دوباره تلاش کنید.'
          : (err.message || 'خطا در برقراری ارتباط با اتومیشن پرو آنلاین'),
      });
    }
  });

  // Vite dev server middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[KidsFashion] Server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
