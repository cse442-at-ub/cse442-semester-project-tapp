from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import viewsets, permissions
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.response import Response
from .serializer import OHQueueSerializer
from .models import OHQueue

class OHQueueViewSet(generics.ListAPIView):
        serializer_class = OHQueueSerializer
        

        def get_queryset(self):
          queryset = OHQueue.objects.all()
          myreq=self.request.query_params.get('classNum')
          return queryset.filter(classNum=myreq)

class OHQueueViewPost(generics.GenericAPIView):
        serializer_class = OHQueueSerializer
        def post(self, request, *args, **kwargs):
          serializer = self.get_serializer(data=request.data)
          serializer.is_valid(raise_exception=True)
          queue = serializer.save()
          return Response({
          "queue": OHQueueSerializer(queue, context=self.get_serializer_context()).data,
          })



class QueueUpdateView(generics.RetrieveUpdateAPIView):
  
  serializer_class = OHQueueSerializer
  def get_object(self, pk):
    return OHQueue.objects.get(pk=pk)
  
  def patch(self,request, *args, **kwargs):
    pk = self.kwargs.get('pk')
    oh_obj = self.get_object(pk)
    serial = OHQueueSerializer(oh_obj, data=request.data, partial = True)
    if serial.is_valid():
      print("serial is valid")
      serial.save()
      return Response(serial.data)
    return JsonResponse(code=400, data="OOK OOK OOK OOK OOK OOK OOK OOK")

class QueueDeleteView(generics.GenericAPIView):
    serializer_class = OHQueueSerializer
    def get_object(self, pk):
      return OHQueue.objects.get(pk=pk)

    def delete(self, request, *args, **kwargs):
      try:
        pk = self.kwargs.get("pk")
        oh_obj = self.get_object(pk)
        oh_obj.delete()
        return Response({
          "msg": "Success!"
        })
      except:
        return Response({
          "msg": "Failed to Delete Queue!",
          "msg2": "Double check url and queue id, and try again!"
        })  