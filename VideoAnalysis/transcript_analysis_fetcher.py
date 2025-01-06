import openai
import os
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import TranscriptsDisabled

openai.api_key = os.getenv("OPENAI_API_KEY")

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

def analyze_transcript(full_text, fileToWrite):
    chunk_size = 10000  
    chunks = [full_text[i:i + chunk_size] for i in range(0, len(full_text), chunk_size)]

    with open(fileToWrite, "a", encoding="utf-8") as file:
        for chunk in chunks:
            try:
                response = openai.ChatCompletion.create(
                    model="gpt-4",
                    temperature=0,
                    messages=[
                        {"role": "system", "content": "You are a helpful assistant that cleans transcripts, improves readability, and analyzes it"},
                        {"role": "user", "content": f"Analyze the transcript comprehensively and categorize it by the topics presented, ignoring any lines containing '**Question - **' or '**Answer - **'. Ensure the analysis is: - Comprehensive and unified, providing a single, detailed breakdown of the transcript. - Categorized clearly by topics, with logical and non-repetitive connections between categories and within the analysis. - Structured and insightful, using headings to organize each topic and including in-depth commentary. Here is the transcript:\n\n{chunk}"
                        }
                    ]
                )
                response = response['choices'][0]['message']['content']
                file.write(response + "\n\n")
            except openai.OpenAIError as e:
                print(f"Open AI error: {e}")
            except Exception as e:
                print(f"An unexpected error occurred: {e}")

#full_text_1 = read_transcript_from_file("Transcripts/Video1JacobBarandes.txt")
#clean_transcript(full_text_1, "Video1_Cleaned_Transcript.txt")
full_cleaned_text_1 = read_transcript_from_file("Video1_Cleaned_Transcript.txt")
analyze_transcript(full_cleaned_text_1, "Video1_Analysis.txt")