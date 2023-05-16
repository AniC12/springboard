def print_upper_words(words):

    """Given list of words, print out each word on a separate line, 
    but in all uppercase.
    
    For example:
      print_upper_words(["hello", "hey", "eat", "goodbye", "end", "yes"])

    Should print:
      "HELLO"
      "HEY"
      "EAT"
      "GOODBYE"
      "END"
      "YES"
    """  
    for word in words:
        print(word.upper())



def print_upper_words2(words):

    """Change that function so that it only prints words
      that start with the letter 'e' (either upper or lowercase).

    Should print:
        "eat"
        "end"
    """
    for word in words:
        if word[0] == 'e' or word[0] == 'E':
            print(word.upper())

def print_upper_words4(words):

    """Change that function so that it only prints words
      that start with the letter 'e' (either upper or lowercase).

    Should print:
        "eat"
        "end"
    """
    for word in words:
        if word[0] == 'e' or word[0] == 'E':
            print(word.upper())


def print_upper_words3(words, must_start_with):

    """ Make your function more general: 
    you should be able to pass in a set of letters, 
    and it only prints words that start with one of those letters.
    
    For example:
    
        print_upper_words(["hello", "hey", "goodbye", "yo", "yes"],
                    must_start_with={"h", "y"})
        
        # this should print "HELLO", "HEY", "YO", and "YES"
    
    """

    for word in words:
        if word[0] in must_start_with:
            print(word.upper())