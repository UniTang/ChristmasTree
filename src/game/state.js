export const state = { treeIndex: 0, trees: [[], []], customTrees: [null,null], selectedId: null };
Object.defineProperty(state,'ornaments',{get(){return this.trees[this.treeIndex]},set(value){this.trees[this.treeIndex]=value}});
let nextId = 1;
export function addOrnament(item, x, y) {
  const ornament = { instanceId: nextId++, type: item.id, emoji: item.emoji, image:item.image||null, color:item.color, x, y, size:.075, rotation:0 };
  state.ornaments.push(ornament); state.selectedId = ornament.instanceId; return ornament;
}
export function selected() { return state.ornaments.find(item => item.instanceId === state.selectedId) ?? null; }
export function removeSelected() { state.ornaments = state.ornaments.filter(item => item.instanceId !== state.selectedId); state.selectedId = null; }
