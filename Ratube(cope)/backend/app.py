   from flask import Flask
   from flask_sqlalchemy import SQLAlchemy

   app = Flask(__name__)

   # Налаштування підключення до бази даних
   app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'  # Для SQLite
   db = SQLAlchemy(app)

   # Створення моделі
   class MyModel(db.Model):
       id = db.Column(db.Integer, primary_key=True)
       name = db.Column(db.String(100), nullable=False)
       age = db.Column(db.Integer)

   @app.route('/')
   def index():
       # Вивести записи з бази даних
       records = MyModel.query.all()
       return ', '.join([f'{record.name} ({record.age})' for record in records])

   if __name__ == '__main__':
       db.create_all()  # Створення таблиць
       app.run(debug=True)
   
