from rest_framework.pagination import PageNumberPagination


class DefaultPageNumberPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = "page_size"
    max_page_size = 50

    def get_paginated_response(self, data):
        response = super().get_paginated_response(data)
        response.data["page_size"] = self.page_size
        return response
