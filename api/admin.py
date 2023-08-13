from django.contrib import admin
from .models import APILog

class PathListFilter(admin.SimpleListFilter):
    title = 'path'  # Human-readable title
    parameter_name = 'path'  # URL parameter

    def lookups(self, request, model_admin):
        # Define custom paths you want to filter by
        return (
            ('meal-plan', 'Meal Plan'),
            ('other-path', 'Other Path'),
            # Add more as needed
        )

    def queryset(self, request, queryset):
        # Filter the queryset based on the selected filter
        value = self.value()
        if value:
            return queryset.filter(path__icontains=value)
        return queryset
    
    
class APILogAdmin(admin.ModelAdmin):
    list_display = ('path', 'method', 'timestamp')  # What fields to display in the list view
    search_fields = ('path', 'method')  # Allow searching by path and method
    list_filter = ('method', PathListFilter)  # Allow filtering by HTTP method
    date_hierarchy = 'timestamp'  # Allow drilling down by date
    readonly_fields = ('path', 'method', 'timestamp', 'request_data', 'response_data')  # Make all fields read-only

admin.site.register(APILog, APILogAdmin)
