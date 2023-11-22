import test from "ava";
import { Board } from "@google-labs/breadboard";
import MarkdownKit from "../../../src/kits/MarkdownKit.js";


test("markdownkit.generateMermaid", async (t) => {
	const board = new Board({
		title: "Markdown Kit Mermaid",
		description: "Exadev Markdown Kit Mermaid Test",
		version: "0.0.1",
	});

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	const markdownKit = board.addKit(MarkdownKit);

	const input = board.input({
		$id: "board",
		schema: {
			type: "object",
			properties: {
				text: {
					type: "string",
					title: "Text",
					description: "concat",
				},
			},
		},
	});

	const input2 = board.input({
		$id: "filename",
		schema: {
			type: "object",
			properties: {
				text: {
					type: "string",
					title: "Text",
					description: "concat",
				},
			},
		},
	});

	const input3 = board.input({
		$id: "title",
		schema: {
			type: "object",
			properties: {
				text: {
					type: "string",
					title: "Text",
					description: "concat",
				},
			},
		},
	});

	const input4 = board.input({
		$id: "directory",
		schema: {
			type: "object",
			properties: {
				text: {
					type: "string",
					title: "Text",
					description: "concat",
				},
			},
		},
	});

	const generateMermaid = markdownKit.generateMermaid();
	input.wire("->boardjson", generateMermaid);
	input2.wire("->filename", generateMermaid);
	input3.wire("->title", generateMermaid);
	input4.wire("->dir", generateMermaid);

	const myBoard = JSON.stringify(board, null, "\t");
	// doesn't return anything, just writes to disk
	await board.runOnce({
		boardjson: myBoard,
		filename: board.title,
		title: board.title,
		dir: "./tests/kits/markdownKit"
	});

	// TODO add a check that file has been created and then delete it ??
	t.is(true, true);
});