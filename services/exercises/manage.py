# services/exercises/manage.py


import unittest
import coverage

from flask_script import Manager
from flask_migrate import MigrateCommand

from project import create_app, db
from project.api.models import Exercise


COV = coverage.coverage(
    branch=True,
    include='project/*',
    omit=[
        'project/tests/*',
        'project/config.py',
        'project/__init__.py'
    ]
)
COV.start()


app = create_app()
manager = Manager(app)
manager.add_command('db', MigrateCommand)


@manager.command
def test():
    """Runs the unit tests without test coverage."""
    tests = unittest.TestLoader().discover('project/tests', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    return 1


@manager.command
def cov():
    """Runs the unit tests with coverage."""
    tests = unittest.TestLoader().discover('project/tests')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        COV.stop()
        COV.save()
        print('Coverage Summary:')
        COV.report()
        COV.html_report()
        COV.erase()
        return 0
    return 1


@manager.command
def recreate_db():
    """Recreates a database."""
    db.drop_all()
    db.create_all()
    db.session.commit()


@manager.command
def seed_db():
    """Seeds the database."""
    db.session.add(Exercise(
        body=('Define a function called sum that takes two integers as '
              'arguments and returns their sum.'),
        test_code='sum(2, 3)',
        test_code_solution='5'
    ))
    db.session.add(Exercise(
        body=('Define a function called reverse that takes a string as '
              'an argument and returns the string in reversed order.'),
        test_code='reverse("racecar")',
        test_code_solution='racecar'
    ))
    db.session.add(Exercise(
        body=('Define a function called factorial that takes a random number '
              'as an argument and then returns the factorial of that given '
              'number.'),
        test_code='factorial(5)',
        test_code_solution='120'
    ))
    db.session.commit()


if __name__ == '__main__':
    manager.run()
