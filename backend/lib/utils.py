from rest_framework.request import Request


def get_full_url(request: Request, path: str):
    scheme = request._request.scheme
    host = request._request.get_host()
    if not path.startswith("/"):
        path = "/" + path
    return f"{scheme}://{host}{path}"
