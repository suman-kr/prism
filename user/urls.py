from django.urls import path
from user.views import UserList, UserDetail, Login, VerifyEmail
urlpatterns = [
    path('all/', UserList.as_view()),
    path('<int:pk>/', UserDetail.as_view()),
    path('add/', UserDetail.as_view()),
    path('login/', Login.as_view()),
    path('verify/', VerifyEmail.as_view())
]
