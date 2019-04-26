import React, { Component } from 'react';
import Card from './Card';
import api from './services/api';
import './Deck.css';

export default class Deck extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deck: null,
			drawn: []
		};
		this.getCard = this.getCard.bind(this);
	}

	async componentDidMount() {
		let deck = await api.get('new/shuffle/');
		this.setState({
			deck: deck.data
		});
	}

	async getCard() {
		let deck_id = this.state.deck.deck_id;
		try {
			let cardResponse = await api.get(`${deck_id}/draw/`);
			if (!cardResponse.data.success) {
				throw new Error('No card remaining!');
			}
			let card = cardResponse.data.cards[0];

			this.setState(st => ({
				drawn: [...st.drawn, { id: card.code, image: card.image, name: `${card.value} of ${card.suit}` }]
			}));
		} catch (err) {
			alert(err);
		}
	}

	render() {
		const cards = this.state.drawn.map(card => <Card key={card.id} name={card.name} image={card.image} />);

		return (
			<div className="Deck">
				<h1 className="Deck-title">♦ Card Dealer ♦</h1>
				<h2 className="Deck-title subtitle">♦ A little demo made with React ♦</h2>
				<button className="Deck-btn" onClick={this.getCard}>
					Get card!
				</button>
				<div className="Deck-cardarea">{cards}</div>
			</div>
		);
	}
}
