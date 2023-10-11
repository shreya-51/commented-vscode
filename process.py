import os
import re
import sys
import openai
from dotenv import load_dotenv

def ask_question(prompt, model, temperature=0.9, max_tokens=100):
    response = openai.Completion.create(
        engine=model,
        prompt=prompt,
        temperature=temperature,
        max_tokens=max_tokens,
        n=1,
        stop=None,
        frequency_penalty=0,
        presence_penalty=0
    )
    answer = response.choices[0].text.strip()
    return answer

def prep_query(highlighted_code, entire_code):
    query = f'Provide comments for this highlighted code: {highlighted_code}. For context, this is the entire file: {entire_code}. Only provide a one line comment for the highlighted code.'
    return query

def get_llm_reply(query):
    model = "gpt-3.5-turbo-instruct"
    answer = ask_question(query, model)
    return answer

def check_comment_format(s):
    if re.match(r'^#\s*', s): return s 
    else                    : return '# ' + s

def process_content(highlighted_code, entire_code ):
    query = prep_query(highlighted_code, entire_code)
    reply = get_llm_reply(query)    
    return check_comment_format(reply)

if __name__ == "__main__":
    load_dotenv()
    openai.api_key = os.environ.get('OPENAI_API_KEY')
    highlighted_content = sys.argv[1]
    entire_content      = sys.argv[2]
    
    processed_content = process_content(highlighted_content, entire_content)
    print(processed_content)
