from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data (delete each object individually to avoid Djongo unhashable error)
        for obj in Activity.objects.all():
            if getattr(obj, 'id', None) is not None:
                obj.delete()
        for obj in Leaderboard.objects.all():
            if getattr(obj, 'id', None) is not None:
                obj.delete()
        for obj in User.objects.all():
            if getattr(obj, 'id', None) is not None:
                obj.delete()
        for obj in Team.objects.all():
            if getattr(obj, 'id', None) is not None:
                obj.delete()
        for obj in Workout.objects.all():
            if getattr(obj, 'id', None) is not None:
                obj.delete()

        # Create Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create Users
        users = [
            User.objects.create(name='Spider-Man', email='spiderman@marvel.com', team=marvel),
            User.objects.create(name='Iron Man', email='ironman@marvel.com', team=marvel),
            User.objects.create(name='Wonder Woman', email='wonderwoman@dc.com', team=dc),
            User.objects.create(name='Batman', email='batman@dc.com', team=dc),
        ]

        # Create Activities
        Activity.objects.create(user=users[0], type='Running', duration=30, date=timezone.now().date())
        Activity.objects.create(user=users[1], type='Cycling', duration=45, date=timezone.now().date())
        Activity.objects.create(user=users[2], type='Swimming', duration=60, date=timezone.now().date())
        Activity.objects.create(user=users[3], type='Yoga', duration=40, date=timezone.now().date())

        # Create Workouts
        Workout.objects.create(name='Hero HIIT', description='High intensity interval training for heroes', suggested_for='Marvel')
        Workout.objects.create(name='Power Yoga', description='Yoga for strength and flexibility', suggested_for='DC')

        # Create Leaderboard
        Leaderboard.objects.create(team=marvel, points=100)
        Leaderboard.objects.create(team=dc, points=90)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
