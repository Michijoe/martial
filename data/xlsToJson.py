import pandas as pd
import json

try:
  with pd.ExcelFile('data.xlsx') as xls:
    df = pd.read_excel(xls)
except FileNotFoundError:
  print("The file data.xlsx does not exist.")
  exit()

try:
  questions = [{
    'text': question,
    'choices': [{
      'text': row['Réponses'],
      'value': pd.to_numeric(row[2:], errors='coerce').fillna(0).astype(int).loc[lambda x: x != 0].to_dict()
    } for _, row in df[df['Questions'] == question].iterrows()]
  } for question in df['Questions'].unique()]
except KeyError as e:
  print(f"The DataFrame does not contain a column named {e}.")
  exit()

try:
  with open('data.json', 'w', encoding='utf-8') as f:
    json.dump({'questions': questions}, f, ensure_ascii=False)
except IOError:
  print("An error occurred while writing to data.json.")