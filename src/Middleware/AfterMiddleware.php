<?php

/*
 * This file is part of foskym/flarum-sorts-for-user-directory.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
namespace FoskyM\SortsForUserDirectory\Middleware;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Flarum\Http\RequestUtil;
use Laminas\Diactoros\Response\JsonResponse;

class AfterMiddleware implements MiddlewareInterface
{
    public function process(Request $request, RequestHandlerInterface $handler): Response
    {
        $response = $handler->handle($request);

        $path = $request->getUri()->getPath();
        if ($path === '/users') {
            $sort = $request->getAttribute('user-directory.sort');

            $body = json_decode($response->getBody(), true);
            $body['links']['first'] = str_replace('sort=', 'sort='.$sort, $body['links']['first']);

            return new JsonResponse($body, $response->getStatusCode());
        }

        return $response;
    }
}
