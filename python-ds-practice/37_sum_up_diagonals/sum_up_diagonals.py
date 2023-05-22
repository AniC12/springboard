def sum_up_diagonals(matrix):
    """Given a matrix [square list of lists], return sum of diagonals.

    Sum of TL-to-BR diagonal along with BL-to-TR diagonal:

        >>> m1 = [
        ...     [1,   2],
        ...     [30, 40],
        ... ]
        >>> sum_up_diagonals(m1)
        73

        >>> m2 = [
        ...    [1, 2, 3],
        ...    [4, 5, 6],
        ...    [7, 8, 9],
        ... ]
        >>> sum_up_diagonals(m2)
        30
    """
    l = len(matrix)
    sum1 = 0
    sum2 = 0

    for i in range(l):
        sum1 += matrix[i][i]
        sum2 += matrix[i][l - 1 - i]

    return sum1 + sum2

m1 = [[1,   2], [30, 40],]
m2 = [[1, 2, 3], [4, 5, 6], [7, 8, 9],]

print(sum_up_diagonals(m1))
print(sum_up_diagonals(m2))