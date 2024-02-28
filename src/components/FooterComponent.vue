<template>
	<div class="footer">
		<table>
			<thead>
				<tr>
					<th>
						Ticker
						<input class="searchbar" type="text" v-model="searchTerm" placeholder="Search Ticker" @input="filterStocks">
					</th>
					<th>Price</th>
					<th>Chg</th>
					<th>Chg%</th>
					<th>Technical Rating</th>
					<th>Vol</th>
					<th>Volume Price</th>
					<th>Mkt Cap</th>
					<th>P/E</th>
					<th>EPS (TTM)</th>
					<th>Employees</th>
					<th>Sector</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="stock in filteredStocks" :key="stock.ticker">
					<td>{{ stock.ticker }}</td>
					<td>{{ stock.price }}</td>
					<td>{{ stock.chg }}</td>
					<td>{{ stock.chgPercent }}</td>
					<td>{{ stock.technicalRating }}</td>
					<td>{{ stock.vol }}</td>
					<td>{{ stock.volumePrice }}</td>
					<td>{{ stock.mktCap }}</td>
					<td>{{ stock.pe }}</td>
					<td>{{ stock.eps }}</td>
					<td>{{ stock.employees }}</td>
					<td>{{ stock.sector }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
  
<script>
export default {
	name: 'FooterComponent',
	data() {
		return {
			searchTerm: '',
			stocks: [
				{ ticker: 'AAPL', price: 150.55, chg: 2.35, chgPercent: '+1.5%', technicalRating: 'Strong Buy', vol: 1000000, volumePrice: 20000000, mktCap: 2000000000, pe: 30, eps: 5.6, employees: 10000, sector: 'Technology' },
				{ ticker: 'GOOGL', price: 2800.50, chg: -15.75, chgPercent: '-0.6%', technicalRating: 'Buy', vol: 750000, volumePrice: 15000000, mktCap: 1800000000, pe: 35, eps: 10.2, employees: 50000, sector: 'Technology' },
				{ ticker: 'MSFT', price: 330.75, chg: 1.20, chgPercent: '+0.4%', technicalRating: 'Strong Buy', vol: 1200000, volumePrice: 25000000, mktCap: 2200000000, pe: 32, eps: 6.8, employees: 80000, sector: 'Technology' },
			]
		};
	},
	computed: {
		filteredStocks() {
			return this.stocks.filter(stock => stock.ticker.toLowerCase().includes(this.searchTerm.toLowerCase()));
		}
	},
	methods: {
		filterStocks(event) {
			this.searchTerm = event.target.value;
		}
	}
};
</script>
  
<style scoped>
.footer {
	padding: 10px;
}

.searchbar {
	margin-left: 4px;
	padding: 4px;
	border-radius: 4px;
}

table {
	width: 1010px;
	border-collapse: collapse;
}

th,
td {
	background-color: #131722;
	border-bottom: 0.1px ridge #d7d8d6;
	text-align: left;
	padding: 8px;
	color: #d7d8d6;
	font-size: x-small;
}

th {
	background-color: #22252e;
	color: #c1c4cd;
	font-size: smaller;

}



tbody tr:hover {
	background-color: #e0e0e0;
}

th,
td {
	border-left: none;
	border-right: none;
}

th:last-child,
td:last-child {
	border-right: 0.1px ridge #d7d8d6;
}
</style>
