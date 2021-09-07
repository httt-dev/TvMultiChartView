
function generateRandomInteger(max) {
    return Math.floor(Math.random() * max) + 1;
}
const TvChart = {
    rows : 1 ,
    cols : 4 ,
    symbols : "BINANCE:XRPUSDT",
    symbolsCount:0,
    chkHideIndiRsi:false,
    chkHideLeftToolbar:false,
    //row_height : "30vh",
    init : function(){
        var div_main_container = document.getElementById('container');
        if(div_main_container){
            document.getElementById('container').innerHTML ="";
        }
    },
    //tv_widget_id : "tradingview_cf"+generateRandomInteger(999999),
    create_chart : function(div_row_outer ,div_row , div_row_inner , symbol , tv_widget_id){

                    //create div elemt 
                    // var div_row_outer = document.createElement('div');
                    // //add style 
                    // div_row_outer.setAttribute("style","height:"+this.row_height);

                    // var div_row = document.createElement('div');
                    // div_row.className="row justify-content-center h-100";
                
                    // var div_row_inner = document.createElement('div');
                    // div_row_inner.className= "col-md-3 bg-success";

                    //<!-- TradingView Widget BEGIN -->
                    var div_tv_widget_container = document.createElement('div');
                    div_tv_widget_container.className= "tradingview-widget-container chart-height chart-width";

                    var div_tv_unique = document.createElement('div');
                    div_tv_unique.className = "chart-height chart-width";
                    //var  tv_id = "tradingview_cf"+generateRandomInteger(999999);
                    div_tv_unique.id =tv_widget_id;

                    var div_tv_copyright = document.createElement('div');
                    div_tv_copyright.className ="tradingview-widget-copyright";
                    div_tv_copyright.innerHTML = `<a href="https://www.tradingview.com/symbols/XRPUSDT/?exchange=BINANCE" rel="noopener" target="_blank">
                                                    <span class="blue-text">XRPUSDT Chart</span>
                                                    </a> by TradingView`;
                    
                    var indiList;
                    if (!this.chkHideIndiRsi){
                        indiList = "StochasticRSI@tv-basicstudies";
                    }else{
                        indiList = "";
                    }
                    var mainHtmlTv = `<script type="text/javascript">
                                        new TradingView.widget(
                                                {
                                                "autosize": true,
                                                "symbol": "`+ symbol+`",
                                                "interval": "15",
                                                "timezone": "Etc/UTC",
                                                "theme": "dark",
                                                "style": "1",
                                                "locale": "en",
                                                "toolbar_bg": "#f1f3f6",
                                                "enable_publishing": false,
                                                "hide_legend":true,
                                                "hide_side_toolbar":`+this.chkHideLeftToolbar+`,
                                                "allow_symbol_change": true,
                                                "studies": [
                                                    "`+indiList+`"
                                                  ],
                                                "container_id": "`+tv_widget_id+`"
                                            }
                                        );
                                        </script>`;
                    var tv_text_node = document.createTextNode(mainHtmlTv);

                    div_tv_widget_container.appendChild(div_tv_unique)   ;
                    div_tv_widget_container.appendChild(div_tv_copyright);
                    div_tv_copyright.insertAdjacentHTML("afterend" , mainHtmlTv);
                    

                    //<!-- TradingView Widget END -->

                    var div_main_container = document.getElementById('container');
                    if(div_main_container){
                        div_row_inner.appendChild(div_tv_widget_container);
                        div_row.appendChild(div_row_inner);
                        div_row_outer.appendChild(div_row);
                        div_main_container.appendChild(div_row_outer);
                    }

                    var scripts = document.querySelectorAll("script");
                    
                    (0,eval)(scripts[scripts.length - 1].textContent);
    },
    create_multi_chart:function(){
        let symbolIndex =0;
        for(var row =1 ; row <= this.rows ; row++){
            var div_row_outer = document.createElement('div');
            div_row_outer.id = "div_row_outer_"+ row;
            var row_height = Math.floor(95/this.rows).toString()+"vh";

            
            div_row_outer.setAttribute("style","height:"+row_height);

            var div_row = document.createElement('div');
            div_row_outer.id = "div_row_"+ row;
            div_row.className="row justify-content-center h-100";

            for(var col = 1 ; col<=this.cols ; col++){
                symbolIndex++;
                var colNumbers = Math.floor( 12/this.cols);
                var col_class = "col-md-"+colNumbers;
                console.log("row =" + row + "; col=" + col);
                if(row == this.rows){
                    var mod = this.symbolsCount%this.cols;
                    if(this.symbolsCount < this.cols){
                        col_class ="col-md-"+this.cols;
                    }else{
                        if(mod>0){
                            col_class ="col-md-"+Math.floor( 12/mod);
                        }
                        
                    }
                    
                }
                var div_row_inner = document.createElement('div');
                div_row_inner.id = "div_row_inner_"+ row + "_" + col;
                div_row_inner.style ="padding-top:2px;";

                div_row_inner.className= col_class + " bg-success";
                var symbolId = this.symbols["symbol"+symbolIndex.toString()];
                if(symbolId!=""){
                    this.create_chart(div_row_outer,div_row, div_row_inner,symbolId,"tradingview_cf"+generateRandomInteger(999999));
                }
                
            }
        }
    }


};

const Symbols = {
    symbol1 :"",
    symbol2 :"",
    symbol3 :"",
    symbol4 :"",
    symbol5 :"",
    symbol6 :"",
    symbol7 :"",
    symbol8 :"",
    symbol9 :"",
    symbol10 :"",
    symbol11 :"",
    symbol12 :"",
    symbol13 :"",
    symbol14 :"",
    symbol15 :"",
    symbol16 :"",
    numberOfColsOnRow : "1",
    chkHideIndiRsi : false,
    chkHideLeftToolbar:false
};


const SymbolListStorage ={
    getSymbolsInput: function(){
        let symbolStr = Symbols;
        for(let i =1 ; i<= 16 ; i++ ){
            let symbol = document.getElementById("symbol"+i);
            if(symbol){
                symbolStr["symbol"+i]  = symbol.value;
                //Symbols["symbol"+i] = symbolStr;
                //console.log(Symbols);
            }
        }
        symbolStr["numberOfColsOnRow"] = document.querySelector('input[name="radNumberOfColsOnRow"]:checked').id ;
        symbolStr["chkHideIndiRsi"] = document.getElementById("chkHideIndiRsi").checked;
        symbolStr["chkHideLeftToolbar"] = document.getElementById("chkHideLeftToolbar").checked;
        return symbolStr;
    },
    saveSymbolsInput:function(){
        const symbolsInput = this.getSymbolsInput();
        console.log(symbolsInput);
        window.localStorage.removeItem('symbols');
        window.localStorage.setItem('symbols',JSON.stringify(symbolsInput));

    },
    readSymbolsStorage : function(){
        const readSymbols = JSON.parse(window.localStorage.getItem('symbols'));
        return  readSymbols;
    },
    
};

function SaveLocalStorage(){
    SymbolListStorage.saveSymbolsInput();
    document.getElementById('btnInput').click();
}

var PairSymbols = Symbols;
var rows_by_symbol_input = 0;

function ViewChart(){
    var countSymbol =0;

    TvChart.symbols = SymbolListStorage.readSymbolsStorage();
    //tinh toan ol va row dua vao so lieu da input 
    TvChart.cols = document.querySelector('input[name="radNumberOfColsOnRow"]:checked').id.substr(6,1);
    Object.getOwnPropertyNames(TvChart.symbols).forEach(key => {
        console.log(`${key}: ${TvChart.symbols[key]}`)
        if(key.substr(0,3)== "sym" && (TvChart.symbols[key]!="")){
            countSymbol++;
        }
    });
    TvChart.symbolsCount = countSymbol;
    TvChart.rows = Math.ceil(countSymbol/TvChart.cols);
    TvChart.chkHideIndiRsi = TvChart.symbols["chkHideIndiRsi"];
    TvChart.chkHideLeftToolbar = TvChart.symbols["chkHideLeftToolbar"];
    TvChart.init();
    TvChart.create_multi_chart();
}

window.onload = function(){

    PairSymbols = SymbolListStorage.readSymbolsStorage();
    if(PairSymbols){
        countSymbol =0;
        //hien thi len man hinh
        for(var pro in PairSymbols){
            if(Object.prototype.hasOwnProperty.call(PairSymbols, pro)){
                if(pro=="numberOfColsOnRow"){
                    document.getElementById(PairSymbols[pro]).checked = true;
                }else if(pro.substr(0,3)== "sym"){
                    let symbolId = document.getElementById(pro);
                    if(pro){
                        symbolId.value = PairSymbols[pro];
                        if(PairSymbols[pro]!=""){
                            countSymbol++;
                        }
                    }
                }else if(pro== "chkHideIndiRsi"){
                    let chkHideRsi = document.getElementById("chkHideIndiRsi");
                    if(chkHideRsi){
                        chkHideRsi.checked = PairSymbols[pro];
                    }
                    
                }else if(pro== "chkHideLeftToolbar"){
                    let chkHideLeftTb = document.getElementById("chkHideLeftToolbar");
                    if(chkHideLeftTb){
                        chkHideLeftTb.checked = PairSymbols[pro];
                    }
                }

                
            }
        } 

    }
    //TvChart.create_multi_chart();

    // //create div elemt 


    // var div_row_outer = document.createElement('div');
    // //add style 
    // div_row_outer.setAttribute("style","height:30vh");

    // var div_row = document.createElement('div');
    // div_row.className="row justify-content-center h-100";
   
    // var div_row_inner = document.createElement('div');
    // div_row_inner.className= "col-md-3 bg-success";

    // //<!-- TradingView Widget BEGIN -->
    // var div_tv_widget_container = document.createElement('div');
    // div_tv_widget_container.className= "tradingview-widget-container chart-height chart-width";

    // var div_tv_unique = document.createElement('div');
    // div_tv_unique.className = "chart-height chart-width";
    // var  tv_id = "tradingview_cf"+generateRandomInteger(999999);
    // div_tv_unique.id =tv_id;

    // var div_tv_copyright = document.createElement('div');
    // div_tv_copyright.className ="tradingview-widget-copyright";
    // div_tv_copyright.innerHTML = `<a href="https://www.tradingview.com/symbols/XRPUSDT/?exchange=BINANCE" rel="noopener" target="_blank">
    //                                 <span class="blue-text">XRPUSDT Chart</span>
    //                                 </a> by TradingView`;

    // var mainHtmlTv = `<script type="text/javascript">
    //                     new TradingView.widget(
    //                             {
    //                             "autosize": true,
    //                             "symbol": "BINANCE:XRPUSDT",
    //                             "interval": "15",
    //                             "timezone": "Etc/UTC",
    //                             "theme": "dark",
    //                             "style": "1",
    //                             "locale": "en",
    //                             "toolbar_bg": "#f1f3f6",
    //                             "enable_publishing": false,
    //                             "allow_symbol_change": true,
    //                             "container_id": "`+tv_id+`"
    //                         }
    //                     )();
    //                     </script>`;
    // var tv_text_node = document.createTextNode(mainHtmlTv);

    // div_tv_widget_container.appendChild(div_tv_unique)   ;
    // div_tv_widget_container.appendChild(div_tv_copyright);
    // div_tv_copyright.insertAdjacentHTML("afterend" , mainHtmlTv);
    

    // //<!-- TradingView Widget END -->

    // var div_main_container = document.getElementById('container');
    // if(div_main_container){
    //     div_row_inner.appendChild(div_tv_widget_container);
    //     div_row.appendChild(div_row_inner);
    //     div_row_outer.appendChild(div_row);
    //     div_main_container.appendChild(div_row_outer);
    // }

    // var scripts = document.querySelectorAll("script");
    // console.log(scripts);
    // (0, eval)(scripts[scripts.length - 1].textContent);

    
    
}
