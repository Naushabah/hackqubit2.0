# QLoRA Training Plan

This folder is for future fine-tuning scripts and experiment notes.

Planned pipeline:

```text
Small pretrained SLM
+ Class 6-10 curriculum dataset
        ↓
      QLoRA
        ↓
Fine-tuned SLM
```

Current status:

- No training script has been run.
- No cloud AI API has been connected.
- The frontend still uses local demo responses.

Future steps:

1. Prepare dataset from `ai/dataset`.
2. Choose a small open SLM.
3. Train QLoRA adapters.
4. Save adapter checkpoints outside Git if they are large.
5. Evaluate curriculum alignment before connecting to the app.
