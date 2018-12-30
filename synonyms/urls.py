from django.conf.urls import include, url
from synonyms import views
app_name = 'synonyms'
urlpatterns = [
        url(r'^home/$',views.get_home, name="get_home"),
        url(r'^$',views.get_home, name="get_home"),
        url(r'^get_words/$', views.get_synonyms, name="get_synonyms"),
        url(r'^get_markdown/$', views.get_markdown, name="get_markdown")
        ]
