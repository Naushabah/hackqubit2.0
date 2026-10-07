# PathshalaAI Curriculum Dataset

This folder stores local curriculum-aligned training and evaluation data for the future offline tutor.

Current status:

- Sample rows only
- No official board claim
- No cloud AI dependency
- Safe to expand class by class

Target data format:

```json
{
  "class_level": "10",
  "subject": "Science",
  "chapter": "Life Processes",
  "instruction": "Explain photosynthesis in simple words.",
  "response": "Photosynthesis is the process..."
}
```

Next steps:

1. Add verified notes for Class 6-10.
2. Convert notes into question-answer pairs.
3. Add difficulty labels and safety/alignment checks.
4. Split data into train, validation, and evaluation sets.
