export interface DataMatrixPayload {
  productId: string;
  productName: string;
  manufacturer: string;
  batch: string;
  standard: string;
  certification: string;
  manufacturingDate: string;
  expiryDate: string;
  generatedAt: string;
}

export function buildPayload(data: Omit<DataMatrixPayload, 'generatedAt'>): DataMatrixPayload {
  return {
    ...data,
    generatedAt: new Date().toISOString(),
  };
}

export function encodePayload(payload: DataMatrixPayload): string {
  return JSON.stringify(payload, null, 2);
}

export function generateProductId(existingCount: number): string {
  const base = 10004 + existingCount;
  return `BIS-PROD-${base}`;
}

// Renders DataMatrix using bwip-js into a canvas element
export async function renderDataMatrix(
  canvas: HTMLCanvasElement,
  text: string
): Promise<void> {
  try {
    // Dynamic import to avoid SSR issues
    const bwipjs = await import('bwip-js');
    bwipjs.toCanvas(canvas, {
      bcid: 'datamatrix',
      text: text,
      scale: 3,
    });
  } catch (err) {
    console.error('DataMatrix render error:', err);
    throw err;
  }
}

export function downloadCanvas(canvas: HTMLCanvasElement, filename: string) {
  const url = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
}
