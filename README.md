# [CPBL Stats](https://shanyujung.github.io/CPBLStats/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\
統計計算各年度中職球員個人投打成績及球隊歷年全年戰績。\
球員及球隊原始成績引用自[CPBL Opendata](https://github.com/ldkrsi/cpbl-opendata)，球隊基本資料引用自[中職官網](https://www.cpbl.com.tw/)。

## Features

- [x] Sortable table
- [x] react-router-dom
- [x] API

### `Sortable table`

使用者可以透過點擊表格各列 header 正反排序各項球員成績，並透過 select 篩選年度及條件。

### `react-router-dom`

利用 react-router-dom 配合 Navbar 管理畫面渲染。

### `API`

利用 Fetch GET 資料，並將 csv 格式的資料轉換成 json 格式以利後續處理。

## 統計數據

### `.OBP(On-base Percentage)`

本專案所用之上壘率計算公式如下：\
\
**OBP=(H 安打+BB 四壞+HBP 死球)/(AB 打數+BB 四壞+HBP 死球+SF 犧飛)**

根據[MLB Glossary](https://www.mlb.com/glossary/standard-stats/walk)的解釋，故意四壞（Intentional Walk）在紀錄上也被視為是 BB（Walk or Base on Balls）的一部分。\
故大聯盟版本的上壘率的確是有考量故意四壞的，
但中職官網所計算之四壞不包含故意四壞，故計算結果會與中職官網略有不同。

### `OPS+(On-base Plus Slugging Plus)`

根據[MLB Glossary](https://www.mlb.com/glossary/advanced-stats/on-base-plus-slugging-plus)定義 OPS+需經過球場校正，由於中職資料有限故省略球場校正，計算公式如下：

**OPS+=((OBP 上壘率/LgOBP 聯盟平均上壘率)+(SLG 長打率/lgSLG 聯盟平均長打率)-1)x100**

### `ERA+`

根據[MLB Glossary](https://www.mlb.com/glossary/advanced-stats/earned-run-average-plus)定義 ERA+需經過球場校正，由於中職資料有限故省略球場校正，計算公式如下：

**ERA+=(LgERA 聯盟平均防禦率 / ERA 防禦率)x100**
