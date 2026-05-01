import react from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FAQItem from '../components/FAQParts/FAQItem';
import { FAQItemProps } from '../utils/props/faq';

//Handy lil helper
describe('FAQItem component', () => {
  const mockProps: FAQItemProps = {
    id: 1,
    question: 'What is BetterDays?',
    answer: 'BetterDays is a productivity app designed to help you manage your tasks and events efficiently.'
  };

  const setup = () => {
    render(<FAQItem {...mockProps} />);
  };

  // I want to test it starts closed
  test(`should render the questions but keep the answers hidden on launch`, () => {
    setup();
    const questionElement = screen.getByTestId('question');
    const answerElement = screen.queryByTestId('answer');

    expect(questionElement).toBeInTheDocument();
    expect(answerElement).not.toBeInTheDocument();

    //Make sure the arrow does it's thing too
    const arrowElement = screen.getByTestId('arrow');
    expect(arrowElement).toBeInTheDocument();
    expect(arrowElement).not.toHaveClass('open');
  });

  //Now I want to test opening the FAQ item
  test('should open the answer and update the ariaExpanded feeature', () => {
    setup();
    const buttonElement = screen.getByTestId('faqbutton');
    fireEvent.click(buttonElement);
    
    const answerElement = screen.getByTestId('answer');
    expect(answerElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute('aria-expanded', 'true');
  });

  //Now, lets try to check it closes correctly
  test('should close the answer and update the ariaExpanded feature', () => {
    setup();
    const buttonElement = screen.getByTestId('faqbutton');
    
    // Open it first
    fireEvent.click(buttonElement);
    
    // Then close it
    fireEvent.click(buttonElement);
    
    const answerElement = screen.queryByTestId('answer');
    expect(answerElement).not.toBeInTheDocument();
    expect(buttonElement).toHaveAttribute('aria-expanded', 'false');
  });

  //Solid, now I want to test the arrow rotates correctly
  test('should rotate the arrow when toggling the FAQ item', () => {
    setup();
    const buttonElement = screen.getByTestId('faqbutton');
    const arrowElement = screen.getByTestId('arrow');

    // Initially, the arrow should not have the 'open' class
    expect(arrowElement).not.toHaveClass('open');

    // Click to open
    fireEvent.click(buttonElement);
    expect(arrowElement).toHaveClass('open');

    // Click to close
    fireEvent.click(buttonElement);
    expect(arrowElement).not.toHaveClass('open');
  });
});

