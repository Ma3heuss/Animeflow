from django.db import models


class Anime(models.Model):
    nome = models.CharField(max_length=150)
    genero = models.CharField(max_length=50)
    ano = models.IntegerField()
    finalizado = models.BooleanField(default=False)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.nome
