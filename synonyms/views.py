from django.shortcuts import render
from django.http import JsonResponse
from django.http import Http404
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
import json
import  pickle
import os
import markdown
directory = os.path.dirname(os.path.realpath(__file__))
dictionary_english = pickle.load( open( directory + "/pickle/thesaurusEnglish.pickle", "rb" ) )


def get_home(request):
    return render(request,'synonyms/synonyms.html')

def get_synonyms(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode("utf-8"))
        print(data)
    else:
        raise Http404("Error")
    synonyms = dictionary_english.get(data['word'].strip().lower(), '')
    # print(syn)
    response = JsonResponse({data['word']:synonyms})
    return response

def get_markdown(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
    else:
        raise Http404("Error")
    html = markdown.markdown(data["para"])
    response = JsonResponse({data["para"]:html})
    return response
