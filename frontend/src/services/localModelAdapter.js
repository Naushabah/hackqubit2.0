/**
 * LocalModelAdapter
 *
 * This is the integration boundary between the React Tutor UI and the future
 * on-device/local SLM runtime. The architecture is intentionally separate so the
 * React page never contains inference logic directly.
 *
 * Later, this adapter can be replaced by a native Android bridge or a local
 * WebAssembly/JS runtime that runs a quantized SLM fully on-device.
 *
 * The real bridge contract is expected to look like:
 *   window.PathshalaAndroidBridge.generateLocalResponse({ prompt, maxTokens, temperature })
 * or a similar native callback that returns a plain text response.
 */
export class LocalModelAdapter {
  constructor() {
    this.isConnected = false;
  }

  async generateResponse({ prompt, maxTokens = 256, temperature = 0.2 }) {
    const request = { prompt, maxTokens, temperature };

    if (!this.isConnected) {
      throw new Error(
        `Local SLM inference is not connected yet. Awaiting adapter bridge: ${request.prompt.slice(0, 24)}...`
      );
    }

    // Future native integration point:
    // const nativeResponse = await window.PathshalaAndroidBridge.generateLocalResponse({
    //   prompt,
    //   maxTokens,
    //   temperature,
    // });
    // return nativeResponse?.text || "";

    throw new Error("Local SLM inference is not connected yet.");
  }
}

export const localModelAdapter = new LocalModelAdapter();

export function connectLocalModelAdapter(adapterInstance) {
  const nextAdapter = adapterInstance || new LocalModelAdapter();
  nextAdapter.isConnected = true;
  return nextAdapter;
}
