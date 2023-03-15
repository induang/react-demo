import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import ReactDOM from "react-dom/client";
import noti from "./noti";
import Loading from "../components/Loading";
import React from "react";

const httpRequest = axios.create({
  baseURL: "http://localhost:4000/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Cache-Control": "no-cache",
    isLoading: true,
  },
});

let requestCount = 0;
let timer = 0;
let loadingCreated = false;
function showLoadingComponent() {
  if (!loadingCreated) {
    loadingCreated = true;
    const loadingRoot = document.createElement("div");
    document.body.appendChild(loadingRoot);
    const loadingModal = ReactDOM.createRoot(loadingRoot);
    loadingModal.render(<Loading />);
  } else {
    const loadingComponent = document.getElementById("tool_loading");
    loadingComponent && (loadingComponent.style.display = "block");
    document.body.style.overflow = "hidden";
  }
}

function hideLoadingComponent() {
  const loadingComponent = document.getElementById("tool_loading");
  if (loadingComponent) {
    loadingComponent.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

function showLoading() {
  requestCount++;
  showLoadingComponent();
}

function hideLoading() {
  requestCount--;
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    if (requestCount <= 0) {
      hideLoadingComponent();
    }
  }, 200);
}

httpRequest.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("user_token") || "";
    if (config.headers) {
      config.headers.Authorization = token;
    }
    if (config.headers.isLoading) {
      showLoading();
    }
    return config;
  },
  (error) => {
    if (error.config.headers.isLoading) {
      hideLoading();
    }
    Promise.reject(error);
  }
);

httpRequest.interceptors.response.use(
  (response) => {
    const token = response.headers?.Authorization;
    token && window.localStorage.setItem("user_token", token);
    if (response.config.headers.isLoading) {
      hideLoading();
    }
    return response.data;
  },
  // 响应 错误处理
  (error) => {
    const message = error.response?.data?.errorMessage || error.message;
    if (error.config.headers.isLoading) {
      hideLoading();
    }

    if (error.response?.status === 401) {
      noti({
        type: "error",
        message: "Unauthorization.",
      });
      window.localStorage.removeItem("user_token");
      window.location.href = "/login";
    }
    noti({ type: "error", message });
    return Promise.reject();
  }
);

export default httpRequest;
