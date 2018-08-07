import * as React     from "react";
import * as css       from './SwaggerEndpoint.css'
import {Tooltip}      from '@blueprintjs/core'
import {swaggerStore} from "../../store/swaggerStore";

export class SwaggerEndpoint extends React.Component {
	render() {
		const {path, endpoint} = this.props;
		return <div className={css.root}>
			<span className={css.path}>{path}</span>
			<div className={css.verbs}>
				<VerbButton endpoint={endpoint} path={path} verb={'get'}/>
				<VerbButton endpoint={endpoint} path={path} verb={'post'}/>
				<VerbButton endpoint={endpoint} path={path} verb={'put'}/>
				<VerbButton endpoint={endpoint} path={path} verb={'patch'}/>
				<VerbButton endpoint={endpoint} path={path} verb={'delete'}/>
			</div>
			{/*<div>{JSON.stringify(endpoint)}</div>*/}
		</div>
	}
}

export class VerbButton extends React.Component {
	render() {
		const {onClick, props: {verb, path, endpoint}} = this;
		if (!endpoint[verb]) {
			return null;
		}

		return <Tooltip position='bottom' content={endpoint[verb].summary}>
			<button className={css.verb} onClick={onClick}>{verb}</button>
		</Tooltip>
	}

	onClick = async () => {
		const {file: {schemes, host}, requests} = swaggerStore;
		const {verb, path, endpoint} = this.props;

		let url = `${_.first(schemes)}://${host}${path}?apikey=123`;
		try {
			const response = await fetch(url);
			const json = await response.json();

			requests.push({path: url, response: json })
		}
		catch (err) {
			requests.push({path: url, response: err.message})
			console.error(err);
		}
	}
}
