# Quantization Plan

This folder is for future model conversion and quantization notes.

Goal:

```text
Fine-tuned SLM
        ↓
Quantized offline model
        ↓
Android local inference
```

Likely future output format:

- GGUF or another mobile-friendly local inference format
- 4-bit quantization when quality is acceptable

Do not place large generated model files in GitHub.
