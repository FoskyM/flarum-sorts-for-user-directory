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

use Flarum\Foundation\ErrorHandling\ExceptionHandler\IlluminateValidationExceptionHandler;
use Flarum\Foundation\ErrorHandling\JsonApiFormatter;
use Illuminate\Support\Arr;
use Illuminate\Validation\ValidationException;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Flarum\Http\RequestUtil;
use Flarum\Api\JsonApiResponse;
use Tobscure\JsonApi\Document;
use Tobscure\JsonApi\Exception\Handler\ResponseBag;

class BeforeMiddleware implements MiddlewareInterface
{
    public function process(Request $request, RequestHandlerInterface $handler): Response
    {
        $sorts = [
            'groups_count',
            'monthly_discussion_count',
            'monthly_comment_count',
        ];
        $path = $request->getUri()->getPath();
        if ($path === '/users') {
            $sort = Arr::get($request->getQueryParams(), 'sort');
            // $sort = -groups_count
            if ($sort && (in_array($sort, $sorts) || in_array(substr($sort, 1), $sorts))) {
                $request = $request->withAttribute('user-directory.sort', $sort);
                $_REQUEST['user-directory.sort'] = $sort;
                $request = $request->withQueryParams(array_merge($request->getQueryParams(), ['sort' => '']));
            }
        }

        return $handler->handle($request);
    }
}
