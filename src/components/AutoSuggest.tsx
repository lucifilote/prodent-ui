import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// @ts-ignore
import * as match from 'autosuggest-highlight/match';
// @ts-ignore
import * as parse from 'autosuggest-highlight/parse';

import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';
import { countries } from '../countries';

const suggestions = countries;

function renderInput(inputProps: any) {
    const {classes, ref, ...other} = inputProps;

    return (
        <TextField
            required={true}
            fullWidth={true}
            label={'Country'}
            autoComplete='nope'
            InputProps={{
                classes: {
                    input: classes.input,
                },
                inputRef: ref,
                ...other,
            }}
        />
    );
}

function renderSuggestion(suggestion: any, {query, isHighlighted}: any) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map((part, index) => {
                    return part.highlight ? (
                        <span key={String(index)} style={{fontWeight: 500}}>
              {part.text}
            </span>
                    ) : (
                        <strong key={String(index)} style={{fontWeight: 300}}>
                            {part.text}
                        </strong>
                    );
                })}
            </div>
        </MenuItem>
    );
}

function renderSuggestionsContainer(options: any) {
    const {containerProps, children} = options;

    return (
        <Paper {...containerProps} square={true}>
            {children}
        </Paper>
    );
}

function getSuggestionValue(suggestion: any) {
    return suggestion.label;
}

function getSuggestions(value: string) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const keep =
                count < 4 && suggestion.label.toLowerCase().slice(0, inputLength) === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

const styles = (theme: any) => ({
    container: {
        flexGrow: 1,
        height: 250,
        position: 'relative',
    },
    suggestion: {
        display: 'block',
    },
    suggestionsContainerOpen: {
        left: 0,
        marginTop: theme.spacing.unit,
        position: 'absolute',
        right: 0,
        zIndex: 1,
    },
    suggestionsList: {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
    },
});

interface IIntegrationAutosuggestProps {
    placeholder: string;
    onSuggestionChange: (value: string) => void;
}

class IntegrationAutosuggest extends React.Component<IIntegrationAutosuggestProps> {
    public state = {
        suggestions: [],
        value: '',
    };

    public render() {
        const {classes}:any = this.props;

        return (
            <Autosuggest
                theme={{
                    container: classes.container,
                    suggestion: classes.suggestion,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                }}
                renderInputComponent={renderInput}
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                renderSuggestionsContainer={renderSuggestionsContainer}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={{
                    classes,
                    onChange: this.handleChange,
                    placeholder: this.props.placeholder,
                    value: this.state.value,
                }}
            />
        );
    }

    private handleSuggestionsFetchRequested = ({value}: any) => {
        this.setState({
            suggestions: getSuggestions(value),
        });
    };

    private handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    private handleChange = (event: any, {newValue}: any) => {
        this.setState({
            value: newValue,
        });
        this.props.onSuggestionChange(newValue);
    };
}

// @ts-ignore
export default withStyles(styles)(IntegrationAutosuggest);
