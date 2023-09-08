import {
	API_LOGIN_URL,
	API_MEETINGS_URL,
	API_REGISTER_URL,
	API_USER_ROLE,
} from '@utils/links';
import { getAuthHeader } from './auth';

export async function createUser(payload: any) {
	return await apiOptions(API_REGISTER_URL, payload);
}

export async function loginUser(payload: any) {
	return await apiOptions(API_LOGIN_URL, payload);
}

export async function createMeeting(payload: any, token: string) {
	const headers = getAuthHeader(token);
	return await apiPost(API_MEETINGS_URL, payload, headers);
}

export async function getUserRole(token: string) {
	const headers = getAuthHeader(token);
	return await apiGet(API_USER_ROLE, headers);
}

async function apiOptions(url: string, payload: any): Promise<Response> {
	const response = await fetch(url, {
		method: 'OPTIONS',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
		credentials: 'include',
	});
	return response;
}

async function apiPost(
	url: string,
	payload: any,
	headers?: Record<string, string>,
): Promise<Response> {
	const requestHeaders = {
		...(headers || {}),
		'Content-Type': 'application/json',
	};
	const response = await fetch(url, {
		method: 'POST',
		headers: requestHeaders,
		body: JSON.stringify(payload),
	});
	console.log(response, response.status, response.statusText);
	return response;
}

async function apiGet(
	url: string,
	headers?: Record<string, string>,
): Promise<Response> {
	const requestHeaders = { ...(headers || {}) };
	const response = await fetch(url, {
		method: 'GET',
		headers: requestHeaders,
	});
	return response;
}