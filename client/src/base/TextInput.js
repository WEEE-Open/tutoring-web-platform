import React, { useState } from "react";
import { Container } from "react-bootstrap";
import ReactMde, { getDefaultToolbarCommands } from "react-mde";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import texLogo from "./textInput/TeX_logo.svg";

import "react-mde/lib/styles/css/react-mde-all.css";
import "katex/dist/katex.min.css";
import "./textInput/textInput.css";

const insertTex = {
	name: "insert-tex",
	icon: () => <img src={texLogo} width="20" height="20" alt="Insert TeX" />,
	execute: ({ textApi, initialState }) => {
		const state = textApi.replaceSelection(`$${initialState.selectedText}$`);
		textApi.setSelectionRange({
			start: 1,
			end: state.selection.end - 1
		});
	}
}

function TextInput({ value, onChange, selectedTab, onTabChange }) {
	const [val, setVal] = (value !== undefined && onChange !== undefined)
		? [value, onChange]
		: useState("");

	const [selTab, setSelTab] = (selectedTab !== undefined && onTabChange !== undefined)
		? [selectedTab, onTabChange]
		: useState("write");

	return (
		<Container>
			<ReactMde 
				value={val}
				onChange={setVal}
				selectedTab={selTab}
				onTabChange={setSelTab}
				commands={{ "insert-tex": insertTex }}
				toolbarCommands={[...getDefaultToolbarCommands(), ["insert-tex"]]}
				generateMarkdownPreview={(markdown) => 
					Promise.resolve(
						<ReactMarkdown
							remarkPlugins={[remarkGfm, remarkMath]}
							rehypePlugins={[rehypeKatex]}
						>
							{markdown}
						</ReactMarkdown>
					)
				}
			/>
		</Container>
	);
}

export default TextInput;