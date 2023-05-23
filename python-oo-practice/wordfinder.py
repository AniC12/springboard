"""Word Finder: finds random words from a dictionary."""
import random

class WordFinder:
    """Machine for finding random words from dictionary.
    
    >>> wf = WordFinder("words.txt")
    
    >>> wf.random()

    """
    def __init__(self, path):

        file = open(path)
        self.words = self.parse(file)

    def parse(self, file):
        
        return [word for word in file]

    def random(self):
        return random.choice(self.words)
    
path = "words.txt"

wf = WordFinder(path)
print(wf.random())

class SpecialWoerdFinder(WordFinder):
    """Specialized WordFinder that excludes blank lines/comments."""

    def parse(self, file):
        return [w.strip() for w in file
                if w.strip() and not w.startswith("#")]
    