from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='Anime',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=150)),
                ('genero', models.CharField(max_length=50)),
                ('ano', models.IntegerField()),
                ('finalizado', models.BooleanField(default=False)),
            ],
            options={
                'ordering': ['-id'],
            },
        ),
    ]
