import openai
import os
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import TranscriptsDisabled
import tiktoken

openai.api_key = os.getenv("OPENAI_API_KEY")

tokenizer = tiktoken.get_encoding("cl100k_base")  # This is the encoding for GPT-4

def read_transcript_from_file(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            return file.read()
    except Exception as e:
        print(f"Error reading file: {e}")
        return ""

def clean_transcript(full_text, fileToWrite):
    chunk_size = 14000  
    chunks = [full_text[i:i + chunk_size] for i in range(0, len(full_text), chunk_size)]

    with open(fileToWrite, "a", encoding="utf-8") as file:
        for chunk in chunks:
            try:
                response = openai.ChatCompletion.create(
                    model="gpt-4",
                    temperature=0,
                    messages=[
                        {"role": "system", "content": "You are a helpful assistant that cleans transcripts, improves readability, and analyzes it"},
                        {"role": "user", "content": f"Clean this transcript for better readability, and organize it into a set of questions and answers between the host, Curt Jaimungal, and the interviewee. - Use only explicitly stated questions and answers from the transcript with the relevant context around it. - Do not infer or create new questions from introductory or contextual statements. - If a statement is not a direct question, it should not be rephrased or converted into one. - Make sure to include all text after the question that is answering it. Here is the transcript:\n\n{chunk}"
                        }
                    ]
                )
                response = response['choices'][0]['message']['content']
                file.write(response + "\n\n")
            except openai.OpenAIError as e:
                print(f"Open AI error: {e}")
            except Exception as e:
                print(f"An unexpected error occurred: {e}")

def analyze_QA_transcript(full_text, fileToWrite, use_chunks):
    chunk_size = 10000  
    
    # Create chunks if use_chunks is True
    if use_chunks:
        chunks = [full_text[i:i + chunk_size] for i in range(0, len(full_text), chunk_size)]
    else:
        chunks = [full_text]

    with open(fileToWrite, "a", encoding="utf-8") as file:
        for chunk in chunks:
            try:
                response = openai.ChatCompletion.create(
                    model="gpt-4",
                    temperature=0,
                    messages=[
                        {"role": "system", "content": "You are a helpful assistant that cleans transcripts, improves readability, and analyzes it"},
                        {"role": "user", "content": f"Analyze the transcript comprehensively and categorize it by the topics presented, ignoring any lines containing '**Question - **' or '**Answer - **'. Ensure the analysis adheres to the following guidelines: 1. **Categorization**: Identify the main distinct topics covered in the transcript. These are generally topics that are spoken about at length, or are essential for understanding the overall interview. 2. **Analysis**: For each topic, write a single, non-repetitive analysis under a clear heading, limiting commentary to enough sentences to make each key point without repitition. Avoid revisiting topics once analyzed. 3. **Conclude**: After all topics have been addressed, provide a final statement summarizing the overall insights. Do not repeat or revisit any of the topics in the conclusion. Here is the transcript: {chunk}"
                        }
                    ]
                )
                response = response['choices'][0]['message']['content']
                file.write(response + "\n\n")
            except openai.OpenAIError as e:
                print(f"Open AI error: {e}")
            except Exception as e:
                print(f"An unexpected error occurred: {e}")

def analyze_transcript(full_text, fileToWrite, use_chunks):
    tokens = tokenizer.encode(full_text)
    chunk_size = 8000  

    # Create chunks if use_chunks is True
    if use_chunks:
        chunks = [tokens[i:i + chunk_size] for i in range(0, len(tokens), chunk_size)]
    else:
        chunks = [tokens]

    with open(fileToWrite, "a", encoding="utf-8") as file:
        for chunk in chunks:
            chunk_text = tokenizer.decode(chunk)
            try:
                response = openai.ChatCompletion.create(
                    model="gpt-4",
                    temperature=0,
                    messages=[
                        {"role": "system", "content": "You are a helpful assistant that cleans transcripts, improves readability, and analyzes it"},
                        {"role": "user", "content": f"Analyze the transcript comprehensively and categorize it by the topics presented. Ensure the analysis adheres to the following guidelines: 1. **Categorization**: Identify the main topics covered in the transcript. These are generally topics that are spoken about at length, or are essential for understanding the overall interview. 2. **Analysis**: For each topic, write a single, non-repetitive analysis under a clear heading, limiting commentary to enough sentences to make each key point without repitition. Avoid revisiting topics once analyzed. 3. **Conclude**: After all topics have been addressed, provide a final statement summarizing the overall insights. Do not repeat or revisit any of the topics in the conclusion. Here is the transcript: {chunk_text}"
                        }
                    ]
                )
                response = response['choices'][0]['message']['content']
                file.write(response + "\n\n")
            except openai.OpenAIError as e:
                print(f"Open AI error: {e}")
            except Exception as e:
                print(f"An unexpected error occurred: {e}")

#full_text_1 = read_transcript_from_file("Transcripts/Video1_Jacob_Barandes.txt")
#clean_transcript(full_text_1, "QAndA/Video1_Cleaned_Transcript.txt")
#full_cleaned_text_1 = read_transcript_from_file("QAndA/Video1_Cleaned_Transcript.txt")
#analyze_QA_transcript(full_cleaned_text_1, "Analysis/Video1_Analysis.txt", True)

#full_text_2 = read_transcript_from_file("Transcripts/Video2_Denis_Noble.txt")
#clean_transcript(full_text_2, "QAndA/Video2_Cleaned_Transcript.txt")
#full_cleaned_text_2 = read_transcript_from_file("QAndA/Video2_Cleaned_Transcript.txt")
#analyze_QA_transcript(full_cleaned_text_2, "Analysis/Video2_Analysis.txt", True)

#full_text_3 = read_transcript_from_file("Transcripts/Video3_Michael_Levin.txt")
#clean_transcript(full_text_3, "QAndA/Video3_Cleaned_Transcript.txt")
#full_cleaned_text_3 = read_transcript_from_file("QAndA/Video3_Cleaned_Transcript.txt")
#analyze_QA_transcript(full_cleaned_text_3, "Analysis/Video3_Analysis.txt", True)

#full_text_4 = read_transcript_from_file("Transcripts/Video4_Julian_Barbour.txt")
#clean_transcript(full_text_4, "QAndA/Video4_Cleaned_Transcript.txt")
#full_cleaned_text_4 = read_transcript_from_file("QAndA/Video4_Cleaned_Transcript.txt")
#analyze_QA_transcript(full_cleaned_text_4, "Analysis/Video4_Analysis.txt", True)

full_text_5 = read_transcript_from_file("Transcripts/Awakening_Videos_Combined.txt")
analyze_transcript(full_text_5, "Analysis/Awakening_Videos_Analysis.txt", True)