import {cardValidation} from '../cardValidation/cardValidation';

it.each(['4111 1111 1111 1112', '371449635398432', '5555555555554445'])('Invalid card', (n) => {
    expect(cardValidation(n)).toBe(false);
});

it.each(['4111 1111 1111 1111', '371449635398431', '5555555555554444'])('valid card', (n) => {
    expect(cardValidation(n)).toBe(true);
});