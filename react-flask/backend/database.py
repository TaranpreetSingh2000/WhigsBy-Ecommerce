import sqlite3

def create_user_table():
    try:
       with sqlite3.connect('whigsby.db') as conn:
        cursor = conn.cursor()

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                mobile TEXT NOT NULL
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS admin (
                id INTEGER PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role TEXT NOT NULL DEFAULT 'admin'
            )
        ''')

        conn.commit()
        conn.close()
        print("Table 'users' created successfully")

    except sqlite3.Error as e:
        print(f"Error occurred: {e}")

# Call the function to create 'users' table before starting the Flask app
create_user_table()