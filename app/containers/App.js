import 'regenerator-runtime/runtime';
import React      from 'react';
import {connect}  from 'react-redux';
import {observer} from 'mobx-react'
import {computed, toJS} from 'mobx'
import _          from 'lodash'
import '@blueprintjs/core/lib/css/blueprint.css';
import ReactJson  from 'react-json-view'

import style             from './App.css';
import {SwaggerEndpoint} from "./components/SwaggerEndpoint";
import {swaggerStore}    from "../store/swaggerStore";

@observer
class App extends React.Component {
	constructor(props, state) {
		super(props, state);
		swaggerStore.file = props.swagger;
	}

	render() {
		const {props: {swagger}} = this;

		return (
			<div className={style.App}>
				<h1>Request Maker</h1>

				<div className={style.paths}>
					{_.keys(swagger.paths).map((k, i) => <div>
						<SwaggerEndpoint key={i} path={k} endpoint={swagger.paths[k]}/>
					</div>)}
				</div>

				<div className={style.requests}>
					<table>
						<thead>
						<tr>
							<th>Path</th>
							<th>Response</th>
						</tr>
						</thead>
						<tbody>
						{swaggerStore.requests.map((r, i) => {
							console.log(toJS(r));
							return <tr key={i}>
								<td style={{verticalAlign: 'top'}}>{r.path}</td>
								<td>{_.isArray(r.response) ? <ReactJson key={i} src={r.response}/> : r.response}</td>
							</tr>
						})}
						</tbody>
					</table>
				</div>
				<div>Debug to show access to swagger JSON:</div>
				<pre className={style.SwaggerDebug}>
				<ReactJson src={JSON.parse(JSON.stringify(swagger, null, 4))} />
				</pre>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {swagger: state.swagger};
}

export default connect(mapStateToProps)(App);
