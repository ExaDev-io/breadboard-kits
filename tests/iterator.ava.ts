// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Board, LogProbe } from "@google-labs/breadboard";
import test from "ava";
import ListKit from "../src/kits/ListKit.js";
test("iterator", async (t) => {
	const board: Board = new Board();
	const listKit = board.addKit(ListKit);

	const list = board.input({
		$id: "list",
		schema: {
			type: "object",
			properties: {
				list: {
					type: "array",
					title: "list",
					description: "list",
				},
			},
		},
	});

	const pop = listKit.pop();

	list.wire("->list", pop);
	pop.wire("->list", pop);
	const output = board.output();
	pop.wire("item->", output);

	const testArray = ["a", "b", "c", "d", "e"];
	const arrayLength = testArray.length;
	// console.log("testArray:", testArray);
	const accumulatedResults = [];
	for await (const result of board.run({
		// probe: new LogProbe(),
	})) {
		// console.log("\n------------------------------\n");
		if (result.type === "input") {
			result.inputs = {
				list: testArray,
			};
		} else if (result.outputs && result.outputs.item) {
			const item = result.outputs.item;
			accumulatedResults.push(item);
		}
	}
	// console.log("RESULT:", accumulatedResults);
	t.is(accumulatedResults.length, arrayLength);
	t.is(testArray.length, 0);
});
