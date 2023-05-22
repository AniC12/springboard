def capitalize(phrase):
    """Capitalize first letter of first word of phrase.

        >>> capitalize('python')
        'Python'

        >>> capitalize('only first word')
        'Only first word'
    """
    if len(phrase) > 0:
        return phrase[0].upper() + phrase[1:]
    else:
        return 'Phrase is empty'

print(capitalize('python'))
print(capitalize('only first word'))