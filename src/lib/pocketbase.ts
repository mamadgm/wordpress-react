// src/lib/pocketbase.ts
import PocketBase from 'pocketbase';

const POCKETBASE_HOST = 'https://apihezartoo.mammutepd.ir/';
const LOCAL_HOST = 'http://127.0.0.1:8090/';

export const pb = new PocketBase(POCKETBASE_HOST);
