from rest_framework import viewsets
from .models import Anime
from .serializers import AnimeSerializer


class AnimeViewSet(viewsets.ModelViewSet):
    serializer_class = AnimeSerializer

    def get_queryset(self):
        queryset = Anime.objects.all()
        nome = self.request.query_params.get('nome')
        if nome:
            queryset = queryset.filter(nome__icontains=nome)
        return queryset
