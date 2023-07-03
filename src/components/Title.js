import { jsx as _jsx } from "react/jsx-runtime";
export function H4(props) {
    return _jsx("h4", { className: "text-lg font-semibold", children: props.text });
}
export function CH4(props) {
    return (_jsx("div", { className: "table m-auto mt-8", children: _jsx(H4, { text: props.text }) }));
}
export function H2(props) {
    return (_jsx("h2", { className: "justify-items-center m-auto text-3xl font-black", children: props.text }));
}
export function CH2(props) {
    return (_jsx("div", { className: "table m-auto mt-8", children: _jsx(H2, { text: props.text }) }));
}
export function H1(props) {
    return _jsx("h1", { className: "text-4xl font-black", children: props.text });
}
