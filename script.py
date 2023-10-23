import sys
import os

def main():
    if len(sys.argv) != 3:
        print("Usage: python script.py <arg1> <arg2>")
        sys.exit(1)
    
    arg1, arg2 = sys.argv[1], sys.argv[2]
    
    # Step 1: Rename .env.sample to .env (if it exists)
    if os.path.exists(".env.sample"):
        os.rename(".env.sample", ".env")
    else:
        print("The file .env.sample does not exist. Creating .env file.")
        open(".env", 'w').close()  # 'w' mode to ensure the file is empty

    # Step 2: Add arguments to .env file
    with open(".env", "w") as env_file:  # 'w' mode to overwrite any existing content
        env_file.write(arg1 + "\n")
        env_file.write(arg2 + "\n")

    print("The arguments have been added to the .env file.")

if __name__ == "__main__":
    main()
