var { Cookie, 'x-r-i': xri, 'x-l-r-i': xlri, ...rest } = $request.headers;
$done({ headers: rest });
