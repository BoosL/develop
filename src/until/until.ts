import { KEY } from "../axios/config";

const CryptoJS = require("crypto-js");
const key = CryptoJS.enc.Utf8.parse(KEY);


//生成随机字符串
export function nonceStr(n:any) {
  const chars = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ];
  let res = "";
  for (let i = 0; i < n; i++) {
    const id = Math.ceil(Math.random() * 35);
    res += chars[id];
  }
  return res;
}


//解密方法
export function Decrypt(msg:any) {
  let iv = localStorage.getItem("user");
  iv = CryptoJS.enc.Utf8.parse(iv);
  const encryptedHexStr = CryptoJS.enc.Hex.parse(msg.split("?")[0]);
  const data = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

//加密方法
export function Encrypt(msg:any) {
  const nostr = nonceStr(16);
  localStorage.setItem("user", nostr);
  const iv = CryptoJS.enc.Utf8.parse(nostr);
  const data = CryptoJS.enc.Utf8.parse(msg);
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return (
    encrypted.ciphertext.toString().toUpperCase() +
    "?" +
    nonceStr(128) +
    "=" +
    nonceStr(128)
  );
}

//userInfo
export function userInfo() {
  if (localStorage.getItem("userInfo")) {
    return JSON.parse(Decrypt(localStorage.getItem("userInfo")));
  } else {
    location.href = "/login";
    return false;
  }
}
