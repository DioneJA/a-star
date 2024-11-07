<template>
    <div class="container py-5" @contextmenu.prevent>
        <!-- Small screen -->
        <div v-if="isMobile" class="selection-menu">
            <label v-for="(label, type) in selectableTypes" :key="type">
                <input type="radio" :value="type" v-model="selectedType"/>
                <span class="text-white ml-2">{{ $t('aStarTypes.' + type + '') }}</span>
            </label>
        </div>

        <div :style="gridStyle">
            <div v-for="(cell, index) in grid" :key="index" :class="['cell', cell.type]"
                @mousedown="!isMobile && handleMouseDown(index, $event)"
                @touchstart="isMobile && handleTouchStart(index)"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AStarExample",
    data() {
        return {
            grid: [],
            types: {
                start: 'Start',
                destination: 'Destination',
                barrier: 'Barrier',
                empty: 'Empty',
                path: 'Path'
            },
            selectableTypes: {
                start: 'Start',
                destination: 'Destination',
                barrier: 'Barrier',
            },
            isDrawingPath: false,
            selectedType: null,
        };
    },
    mounted() {
        this.selectedType = this.types.start;
        this.initGrid();
    },
    computed: {
        mathLength: function () {
            return window.innerWidth <= 768 ? 10 : 15;
        },
        isMobile: function () {
            return window.innerWidth <= 768;
        },
        gridStyle: function () {
            return {
                display: 'grid',
                'grid-template-columns': `repeat(${this.mathLength}, 30px)`,
                'grid-gap': '2px',
                'background-color': 'white',
                'padding': '1px'
            };
        },
    },
    methods: {
        initGrid: function () {
            this.grid = Array(this.mathLength * this.mathLength).fill({ type: 'empty' });
        },
        handleMouseDown: function (index, event) {
            const type = event.button === 0 ? 'destination'
                : event.button === 2 ? 'barrier'
                    : 'start';
            this.setCellType(index, type);
        },
        handleTouchStart: function (index) {
            this.setCellType(index, this.selectedType);
        },
        setCellType: function (index, type) {
            const oldType = this.grid[index].type;

            if ((oldType === 'start' && type === 'destination') ||
                (oldType === 'destination' && type === 'start') ||
                (oldType !== 'barrier' && oldType === type)) {
                return;
            }

            if (oldType === 'barrier' && type === 'barrier') {
                this.$set(this.grid, index, { type: 'empty' });
            } else if (oldType === type) {
                return;
            } else if (type === 'start' || type === 'destination') {
                this.grid = this.grid.map((cell) => {
                    if (cell.type === type) cell.type = 'empty';
                    return cell;
                });
                this.$set(this.grid, index, { type });
            } else if (type === 'barrier') {
                this.$set(this.grid, index, { type });
            }

            this.findPath();
        },
        clearOldPath: function () {
            this.grid = this.grid.map((cell) => {
                if (cell.type === 'path') cell.type = 'empty';
                return cell;
            });
        },
        sleep: function (ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        },
        findPath: async function () {
            const start = this.grid.findIndex((cell) => cell.type === 'start');
            const destination = this.grid.findIndex((cell) => cell.type === 'destination');
            if (start === null || start === -1 || destination === null || destination === -1) {
                return;
            }

            this.isDrawingPath = false;
            await this.sleep(10);
            this.isDrawingPath = true;

            const path = this.aStar(start, destination);

            if (path) {
                this.clearOldPath();
                for (const index of path) {
                    if (!this.isDrawingPath) {
                        this.clearOldPath();
                        break;
                    }

                    if (this.grid[index].type === 'empty') {
                        this.$set(this.grid, index, { type: 'path' });
                        await this.sleep(30);
                    }
                }
            } else {
                alert("Nenhum caminho encontrado.");
            }
        },
        aStar: function (startIndex, endIndex) {
            const size = this.mathLength;
            const getCoords = (index) => [Math.floor(index / size), index % size];
            const getNeighbors = (index) => {
                const [x, y] = getCoords(index);
                const neighbors = [
                    [x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]
                ];
                return neighbors
                    .filter(([nx, ny]) => nx >= 0 && nx < size && ny >= 0 && ny < size)
                    .map(([nx, ny]) => nx * size + ny)
                    .filter((i) => this.grid[i].type !== 'barrier');
            };

            const heuristic = (a, b) => {
                const [ax, ay] = getCoords(a);
                const [bx, by] = getCoords(b);
                return Math.abs(ax - bx) + Math.abs(ay - by);
            };

            const openSet = new Set([startIndex]);
            const cameFrom = {};
            const gScore = Array(this.grid.length).fill(Infinity);
            gScore[startIndex] = 0;
            const fScore = Array(this.grid.length).fill(Infinity);
            fScore[startIndex] = heuristic(startIndex, endIndex);

            while (openSet.size > 0) {
                let current = [...openSet].reduce((a, b) =>
                    fScore[a] < fScore[b] ? a : b
                );

                if (current === endIndex) {
                    const path = [];
                    while (current !== startIndex) {
                        path.unshift(current);
                        current = cameFrom[current];
                    }
                    return path;
                }

                openSet.delete(current);
                for (const neighbor of getNeighbors(current)) {
                    const tentativeGScore = gScore[current] + 1;

                    if (tentativeGScore < gScore[neighbor]) {
                        cameFrom[neighbor] = current;
                        gScore[neighbor] = tentativeGScore;
                        fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, endIndex);
                        if (!openSet.has(neighbor)) openSet.add(neighbor);
                    }
                }
            }
            return null;
        },
    },
};
</script>

<style scoped lang="scss">
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    flex-direction: column;
}

.selection-menu {
    margin-bottom: 10px;
    text-align: center;

    label {
        margin: 0 5px;
    }
}

.cell {
    width: 30px;
    height: 30px;
    background-color: #e0e0e0;
    border: 1px solid #ccc;
    cursor: pointer;
    transition: background-color 0.2s;
}

.cell.empty {
    background-color: #e0e0e0;
}

.cell.start {
    background-color: #4caf50;
}

.cell.destination {
    background-color: #f44336;
}

.cell.barrier {
    background-color: #9e9e9e;
}

.cell.path {
    background-color: #03e7e7;
}
</style>