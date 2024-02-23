<template>
	<table class="symbol-table">
		<thead>
			<tr>
				<th>Symbol</th>
				<th>Last</th>
				<th>Chg</th>
				<th>Chg%</th>
			</tr>
		</thead>
		<tbody>
			<template v-for="(symbolGroup, category) in symbolRows">
				<tr :key="category" class="category-row">
					<td colspan="4" class="category-header" @click="toggleCategory(category)">
						{{ category }}
						<span v-if="categoryExpanded[category]"><img src="../assets/arrow-down.png" class="arrow" alt=""></span>
						<span v-else><img src="../assets/right-arrow.png" class="arrow" alt="arrow"></span>
					</td>
				</tr>
				<template v-if="categoryExpanded[category]">
					<tr v-for="(symbol, index) in symbolGroup" :key="index">
						<td @click="toggleExpand(symbol)" :class="{ 'expanded': symbolExpanded[symbol.symbol] }">
							<span>{{ symbol.symbol }}</span>
						</td>
						<td>{{ symbol.last }}</td>
						<td>{{ symbol.chg }}</td>
						<td>{{ symbol.chgPercent }}</td>
					</tr>
				</template>
			</template>
		</tbody>
	</table>
</template>

<script>
export default {
	data() {
		return {
			symbolRows: {
				Futures: [
					{ symbolIcon: 'img source', symbol: 'Gold', last: 100, chg: 5, chgPercent: '+2.5%', isExpanded: false, categories: ['Commodities'] },
					{ symbolIcon: 'img source', symbol: 'Silver', last: 100, chg: 5, chgPercent: '+2.5%', isExpanded: false, categories: ['Commodities'] }
				],
				Forex: [
					{ symbolIcon: 'img source', symbol: 'EUR/USD', last: 1.18, chg: 0.01, chgPercent: '+0.8%', isExpanded: false, categories: ['Forex'] },
					{ symbolIcon: 'img source', symbol: 'GBP/USD', last: 1.38, chg: 0.02, chgPercent: '+1.5%', isExpanded: false, categories: ['Forex'] }
				],
				Crypto: [
					{ symbolIcon: 'img source', symbol: 'BTC/USD', last: 50000, chg: 1000, chgPercent: '+2.0%', isExpanded: false, categories: ['Crypto'] },
					{ symbolIcon: 'img source', symbol: 'ETH/USD', last: 4000, chg: 200, chgPercent: '+5.0%', isExpanded: false, categories: ['Crypto'] }
				]
			},
			categoryExpanded: {},
			symbolExpanded: {}
		};
	},
	computed: {
		filteredSymbolRows() {
			const filteredRows = {};
			for (const category in this.symbolRows) {
				if (this.categoryExpanded[category]) {
					filteredRows[category] = this.symbolRows[category];
				}
			}
			return filteredRows;
		}
	},
	methods: {
		toggleCategory(category) {
			this.$set(this.categoryExpanded, category, !this.categoryExpanded[category]);
		},
		toggleExpand(symbol) {
			this.$set(this.symbolExpanded, symbol.symbol, !this.symbolExpanded[symbol.symbol]);
		}
	}
};
</script>

<style scoped>
.symbol-table {
	width: 320px;
	border-collapse: collapse;
	font-size: small;
	background-color: #ffffff;
}

.symbol-table th,
.symbol-table td {
	padding: 12px;
	border: 1px solid #eae9e9dd;
	text-align: left;
	border: none;
}

.symbol-table th {
	background-color: #f5f5f5;
	font-weight: 700;
	color: black;
}

.symbol-table td {
	cursor: pointer;
	transition: background-color 0.3s ease;
	border-bottom: 1px solid #ddd;
}

.symbol-table td:hover {
	background-color: #f0f0f0;
}

.category-row {
	background-color: #f0f0f0;
}

.category-header {
	cursor: pointer;
	padding: 12px;
	font-weight: 200;
	color: black;
}

.category-header:hover {
	background-color: #e0e0e0;
}

.expanded {
	font-weight: bold;
}

.symbol-table td span {
	margin-left: 4px;
}

.arrow {
	width: 8px;
	height: 8px;
	fill: #999;
}</style>