from django.utils import timezone
from api.models import APILog

class APILoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        
class APILoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Store request data
        if request.method == 'GET':
            request_data = request.GET.dict() # For GET requests, log query parameters
        else:
            request_data = request.body # For non-GET requests, log body data

        response = self.get_response(request)

        if 'api' in request.path and 'admin/api' not in request.path:
            APILog.objects.create(
                path=request.path,
                method=request.method,
                timestamp=timezone.now(),
                request_data=str(request_data),
                response_data=str(response.content, response.charset)
                # add other fields if needed
            )
            
        return response
